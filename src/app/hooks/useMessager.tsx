import { message } from 'antd';
import { useRouter } from 'next/navigation';

export const useMessager = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const handleSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Success!',
    });
    router.refresh();
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
