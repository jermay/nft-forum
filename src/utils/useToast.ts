import { useNotification } from "web3uikit";
import {
  IPosition,
  notifyType,
  PayloadType,
} from "web3uikit/dist/components/Notification/types";

export const useToast = (
  { position }: { position: IPosition } = { position: "topR" }
) => {
  const dispatchNotification = useNotification();

  const notify = (options: {
    message: string;
    title?: string;
    type: notifyType;
  }) => {
    dispatchNotification({
      ...options,
      position,
    });
  };

  const toastError = (options: { message: string; title?: string }) =>
    notify({ ...options, type: "error" });

  const toastSuccess = (options: { message: string; title?: string }) =>
    notify({ ...options, type: "success" });

  return {
    toastError,
    toastSuccess,
  };
};
