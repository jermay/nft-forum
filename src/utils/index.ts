import { FormDataReturned } from "web3uikit/dist/components/Form/types";

export function getFormKeyValues(formData: FormDataReturned): {
  [key: string]: any;
} {
  return formData.data.reduce((values, val) => {
    if (!val.key) throw new Error("key not defined");
    values[val.key] = val.inputResult;
    return values;
  }, {} as { [key: string]: any });
}
