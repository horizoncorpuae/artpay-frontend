import { PiCreditCardThin } from "react-icons/pi";
import ContentCard from "../../../components/ContentCard.tsx";
import PaymentRadioSelector from "../../../components/PaymentRadioSelector.tsx";

interface PaymentsSelectionProps {
  paymentMethod: string | null;
  onChange: (paymentMethod: string) => void;
}

const PaymentsSelection = ({paymentMethod, onChange} : PaymentsSelectionProps) => {
  const paymentMethods = {
    Santander: {
      value: "Santander",
      label: "Santander",
      description: "Finanzia fino a 30.000 €, in max 84 rate, soggetto ad approvazione dell'istituto di credito.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="#EA1D25" />
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" stroke="#F9F7F6" />
          <path
            d="M19.6526 10.2795C19.9083 10.6554 20.0362 11.0892 20.0682 11.5229C22.4334 12.0723 24.0315 13.2578 23.9995 14.559C23.9995 16.4675 20.8672 18 16.9998 18C13.1323 18 10 16.4675 10 14.559C10 13.2 11.6301 12.0145 13.9633 11.4651C13.9633 11.9855 14.0912 12.506 14.3788 12.9687L16.5843 16.4096C16.7441 16.6699 16.8719 16.959 16.9358 17.2482L17.0317 17.1036C17.5751 16.2651 17.5751 15.1952 17.0317 14.3566L15.2738 11.6096C14.7304 10.7422 14.7304 9.7012 15.2738 8.86265L15.3697 8.71807C15.4336 9.00723 15.5615 9.29639 15.7213 9.55663L16.7441 11.1759L18.3422 13.6916C18.502 13.9518 18.6298 14.241 18.6938 14.5301L18.7897 14.3855C19.333 13.547 19.333 12.4771 18.7897 11.6386L17.0317 8.89157C16.4884 8.05301 16.4884 6.98313 17.0317 6.14458L17.1276 6C17.1915 6.28916 17.3194 6.57831 17.4792 6.83855L19.6526 10.2795Z"
            fill="white"
          />
        </svg>
      )
    },
    klarna: {
      value: "klarna",
      label: "Klarna",
      description: "Paga in 3 rate senza interessi o finanzia fino a 36 mesi.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="#FFB3C7" />
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" stroke="#F9F7F6" />
          <path
            d="M10 8h2.5v8H10V8zm3.5 0h2v3.2l2.8-3.2h2.5l-3.2 3.6L21 16h-2.5l-2.3-3.2L14.5 15V8h-1v8h-1V8zm7.5 0H24v1.5h-2.5v2H24V13h-2.5v1.5H24V16h-3V8z"
            fill="white"
          />
        </svg>
      )
    },
    card: {
      value: "card",
      label: "Carta di credito",
      description: "Paga con Visa, Mastercard o American Express.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="#4A90E2" />
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" stroke="#F9F7F6" />
          <rect x="3" y="6" width="28" height="2" fill="white" />
          <rect x="3" y="10" width="8" height="1.5" fill="white" />
          <rect x="3" y="13" width="12" height="1.5" fill="white" />
          <rect x="3" y="16" width="6" height="1.5" fill="white" />
        </svg>
      )
    },
    bank_transfer: {
      value: "bank_transfer",
      label: "Bonifico bancario",
      description: "Paga tramite bonifico bancario tradizionale.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" fill="#2E7D32" />
          <rect x="0.5" y="0.5" width="33" height="23" rx="3.5" stroke="#F9F7F6" />
          <path
            d="M17 6L9 10v8h16v-8L17 6zm0 2.2l6 3V16H11v-4.8l6-3z"
            fill="white"
          />
          <rect x="13" y="12" width="8" height="1" fill="white" />
          <rect x="13" y="14" width="6" height="1" fill="white" />
        </svg>
      )
    }
  };

  return (
    <ContentCard
      title="Metodi di pagamento"
      icon={<PiCreditCardThin size="28px" />}
      contentPadding={0}
      contentPaddingMobile={0}>
      <div className="space-y-3">
          <PaymentRadioSelector
            method={paymentMethods.klarna}
            selectedMethod={paymentMethod}
            onMethodChange={onChange}
          />
        <PaymentRadioSelector
            method={paymentMethods.card}
            selectedMethod={paymentMethod}
            onMethodChange={onChange}
          />
      </div>
    </ContentCard>
  );
};

export default PaymentsSelection;