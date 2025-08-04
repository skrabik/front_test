import { useAtom } from 'jotai';
import { FC, useState } from 'react';
import { BottomModal } from 'react-spring-modal';
import { toast } from 'sonner';

import { POST } from '~/shared/api';
import { gameAtom } from '~/shared/atoms/game';
import { modalAtom } from '~/shared/atoms/modalAtom';
import { userAtom } from '~/shared/atoms/user';
import { Button, CloseModalButton } from '~/shared/ui';

import styles from './ConfirmBet.module.css';

import tabletEmojiImg from '/tablet-emoji.png';

export const ConfirmBet: FC = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [modal, setModal] = useAtom(modalAtom);
  const [, setUser] = useAtom(userAtom);
  const [, setGame] = useAtom(gameAtom);

  const closeModal = () => {
    if (isWaiting) {
      return;
    }

    setModal((prev) => ({ ...prev, openedModal: null, options: null }));
  };

  const handleDismiss = () => {
    closeModal();
  };

  const handleButtonClick = () => {
    if (!(modal.openedModal === 'confirmBet')) {
      return;
    }

    setIsWaiting(true);

    POST('/api/profiles/bet', {
      body: {
        amount: modal.options.amount,
        currency: modal.options.currency,
        choice: modal.options.choice,
        game_id: modal.options.game_id,
      },
    })
      .then((response) => {
        if (response.error) {
          // теоретически оно стриггерится и на отсутствие сети
          // но как будто особо не имеет разницы

          setModal((prev) => ({
            ...prev,
            openedModal: 'betError',
            options: {
              type: 'timeout',
            },
          }));

          return;
        }

        if (!response.data) {
          return;
        }

        const data = response.data;

        setUser((prev) => {
          if (!prev) {
            // ts sucks
            return prev;
          }

          return {
            ...prev,
            balance: data.actual_balance,
            balance_usdt: data.actual_balance_usdt,
          };
        });
        setGame((prev) => ({
          ...prev,
          stats: {
            basic: {
              YES: data.stats.WORDS.YES.total_rate,
              NO: data.stats.WORDS.NO.total_rate,
            },
            premium: {
              YES: data.stats.USDT.YES.total_rate,
              NO: data.stats.USDT.NO.total_rate,
            },
          },
          userBet: {
            basic: {
              YES: data.user_bet.WORDS.YES.total_rate,
              NO: data.user_bet.WORDS.NO.total_rate,
            },
            premium: {
              YES: data.user_bet.USDT.YES.total_rate,
              NO: data.user_bet.USDT.NO.total_rate,
            },
          },
        }));
        setModal((prev) => ({ ...prev, openedModal: null, options: null }));

        toast.success('Your bet is confirmed');
      })
      .finally(() => {
        setIsWaiting(false);
      });
  };

  return (
    <BottomModal
      isOpen={modal.openedModal === 'confirmBet'}
      onDismiss={handleDismiss}
    >
      <CloseModalButton className={styles.close} onClick={handleDismiss} />
      <div className={styles.image__wrapper}>
        <img className={styles.image} src={tabletEmojiImg} alt="Tablet Emoji" />
      </div>
      {modal.openedModal === 'confirmBet' && (
        <p className={styles.title}>
          Please confirm your bet of {modal.options?.amount}{' '}
          {modal.options?.currency}
        </p>
      )}
      <p className={styles.description}>Are you sure you in?</p>
      <Button
        onClick={handleButtonClick}
        isDisabled={isWaiting}
        color="orange"
        size="m"
        isStretched
      >
        Yes
      </Button>
    </BottomModal>
  );
};
