import Anchor from "../anchor/Anchor.tsx";

const LandingCampaignCopy = () => {
  return (
    <section className={'max-w-xl'}>
      <section className={"leading-[105%] space-y-4 mb-12"}>
        <div>
          <span className={"text-[#6576EE] uppercase text-lg font-bold"}>L'arte di vendere a rate</span>
          <h1 className={"text-[#808791] text-lg uppercase"}>Scopri come far crescere la tua galleria con artpay</h1>
        </div>
        <h2 className={"font-bold text-4xl text-balance"}>Offri ai tuoi clienti l’arte che desiderano, in comode rate</h2>
        <p className={"text-2xl"}>
          Proponi <strong>soluzioni di pagamento</strong> dilazionato sicure e semplici grazie ai nostri{" "}
          <strong>partner</strong>. Aumenti le vendite e <strong>fidelizzi</strong> i tuoi clienti, senza alcun rischio
          per la tua galleria.
        </p>
      </section>
      <Anchor />
      <section className={'lg:mb-12'}>
        <h3 className={"text-[#808791] text-2xl font-medium mb-12"}>Perchè scegliere artpay?</h3>
        <ul className={"ps-4 text-lg space-y-4"}>
          <li
            className={
              'before:text-[#6576EE] before:content-["•"] relative before:absolute before:-top-2 before:-left-4 before:text-2xl ps-4 leading-[115%]'
            }>
            <strong>Più vendite, meno limiti</strong>
            <p>
              Con artpay, rendi le tue opere accessibili a un pubblico più ampio grazie a soluzioni di pagamento dilazionato. Più persone potranno acquistare, senza sminuire il valore dell’arte.
            </p>
          </li>
          <li
            className={
              'before:text-[#6576EE] before:content-["•"] relative before:absolute before:-top-2 before:-left-4 before:text-2xl ps-4 leading-[115%]'
            }>
            <strong>Il prezzo non è più un ostacolo</strong>
            <p>
              Comprare diventa più facile. Con artpay offri ai tuoi clienti la possibilità di pagare con piani personalizzati, sicuri e nel rispetto delle loro possibilità.
            </p>
          </li>
          <li
            className={
              'before:text-[#6576EE] before:content-["•"] relative before:absolute before:-top-2 before:-left-4 before:text-2xl ps-4 leading-[115%]'
            }>
            <strong>Pagamenti garantiti, zero pensieri</strong>
            <p>
              Dimentica insolvenze e ritardi. Con artpay incassi l’intero importo in poche settimane, in totale sicurezza.
            </p>
          </li>
          <li
            className={
              'before:text-[#6576EE] before:content-["•"] relative before:absolute before:-top-2 before:-left-4 before:text-2xl ps-4 leading-[115%]'
            }>
            <strong>Soluzione esclusiva per il mondo dell'arte</strong>
            <p>
              artpay è pensato per gallerie e professionisti del settore. Una piattaforma digitale costruita su misura, in collaborazione con partner finanziari selezionati.
            </p>
          </li>
        </ul>
      </section>
      <Anchor />
    </section>
  );
};

export default LandingCampaignCopy;