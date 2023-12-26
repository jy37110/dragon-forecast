import { message } from 'antd';

export const useMessager = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Success!',
    });
  };
  const handleError = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong',
    });
  };
  return {
    messageApi,
    contextHolder,
    handleSuccess,
    handleError,
  };
};
