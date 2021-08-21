import { IErrorMessage } from './error-messages-interface';

export const LocalizedErrorMessages: IErrorMessage = {
  600: { EN: "user doesn't exist", AR: "user doesn't exist" },
  601: { EN: 'wrong pass', AR: 'wrong pass' },
  602: { EN: 'unauthorized', AR: 'unauthorized' },
  603: {
    EN: "you don't have enough balance",
    AR: "you don't have enough balance",
  },
  605: {
    EN: "can't send money to yourself!",
    AR: "can't send money to yourself!",
  },
};
