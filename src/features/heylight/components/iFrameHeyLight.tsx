import usePaymentStore from "../../cdspayments/stores/paymentStore.ts";


const IFrameHeyLight = () => {
  const {iFrameUrl} = usePaymentStore()

  return (
        <>
          {iFrameUrl && <iframe src={iFrameUrl} width="100%" height="100%" />}
        </>
  );
}

export default IFrameHeyLight;
