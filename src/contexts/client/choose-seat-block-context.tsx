import { ReactNode, createContext, useMemo, useState } from 'react';

import { ISeat, ISeatBlock } from '../../types';

export interface IChooseSeatBlock {
  info: ISeatBlock;
  total: number;
  chooseSeats?: ISeat[];
}
export type TChooseSeatBlockContext = {
  listChooseSeatBlock: IChooseSeatBlock[];
  totalPrice: number;
  totalChooseSeat: number;
  updateSeatBlock: (
    total: number,
    data: ISeatBlock,
    chooseSeats?: ISeat[]
  ) => void;
  updateListSeatBlock: (data: IChooseSeatBlock[]) => void;
  removeSeat: (seatData: ISeat, seatBlock: ISeatBlock) => void;
};

interface Props {
  children?: ReactNode;
}
export const ChooseSeatBlockContext =
  createContext<TChooseSeatBlockContext | null>(null);

export const ChooseSeatBlockContextProvider = ({ children }: Props) => {
  const [listChooseSeatBlock, setListChooseSeatBlock] = useState<
    IChooseSeatBlock[]
  >([]);

  function updateSeatBlock(
    total: number,
    info: ISeatBlock,
    chooseSeats: ISeat[] = []
  ) {
    setListChooseSeatBlock((prevState) => {
      let currentList = [...prevState];
      const currentItemIndex = currentList.findIndex(
        (item) => item.info.id === info.id
      );

      if (currentItemIndex < 0) {
        currentList = [...currentList, { info, total, chooseSeats }];
      } else {
        currentList[currentItemIndex] = {
          info,
          total,
          chooseSeats,
        };
      }

      return currentList.filter((item) => item.total > 0);
    });
  }

  function updateListSeatBlock(data: IChooseSeatBlock[]) {
    setListChooseSeatBlock(data);
  }

  function removeSeat(seatData: ISeat, seatBlock: ISeatBlock) {
    const currentList = [...listChooseSeatBlock];
    const currentItemIndex = currentList.findIndex(
      (item) => item.info.id === seatBlock.id
    );
    if (currentItemIndex < 0) {
      return;
    }
    const newChooseSeat =
      currentList[currentItemIndex].chooseSeats?.filter(
        (item) => item.id !== seatData.id
      ) || [];

    currentList[currentItemIndex] = {
      info: seatBlock,
      total: newChooseSeat.length,
      chooseSeats: newChooseSeat,
    };

    setListChooseSeatBlock(currentList.filter((item) => item.total > 0));
  }

  const valueMemo = useMemo<TChooseSeatBlockContext>(
    () => ({
      listChooseSeatBlock,
      totalPrice: listChooseSeatBlock.reduce(
        (total, item) => total + item.info.price * item.total,
        0
      ),
      totalChooseSeat: listChooseSeatBlock.reduce(
        (total, item) => total + item.total,
        0
      ),
      //
      updateSeatBlock,
      updateListSeatBlock,
      removeSeat,
    }),
    [listChooseSeatBlock]
  );

  return (
    <ChooseSeatBlockContext.Provider value={valueMemo}>
      {children}
    </ChooseSeatBlockContext.Provider>
  );
};
