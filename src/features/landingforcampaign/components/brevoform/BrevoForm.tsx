import { useRef, useState } from "react";
import FormSkeleton from "../../../../components/FormSkeleton.tsx";

const BrevoForm = () => {
  const inputRef = useRef<HTMLIFrameElement>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false)


  const handleLoad = () => {
    setIsLoad(true)
  }

  return (
    <>
      {!isLoad && <FormSkeleton />}
      <div id={'brevo-form'} className={`${isLoad ? "" : "hidden"} lg:min-w-md xl:w-xl sticky top-37.5 mb-12`}>
        <iframe
          ref={inputRef}
          onLoad={handleLoad}
          className={'border border-[#CDCFD3] rounded-3xl w-full shadow-custom'}
          width={400}
          height={580}
          src="https://51f5628d.sibforms.com/serve/MUIFAIm1r-eyYke4A8ZR1xjKzpOMEVC-Zj30P6-kxhruyP6C1YRGCnb2bhqbiemDTHwWb9R5nbEJ3ika0vjk_garnIWTfMs-ZBoJe-4IaFv8rl-YTUu1m0-VkPNYHe47KXiTcV1lnUEXQh3H5mIq_3aUMg_6ac8Rw9ymr5IGVg0jyxZZC6NMEgOcEjKvFLUYGlZshKOarTKOUr6t"
          style={{
            display: "block",
            padding: 0,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
          }}></iframe>
      </div>
    </>
  );
};

export default BrevoForm;