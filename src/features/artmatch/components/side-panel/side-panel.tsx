import { Button, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { FiltersPanel } from "../index.ts";

const FilterIcon = ({ color = "tertiary" }: { color: "primary" | "tertiary" }) => {
  const colorVariants = {
    primary: "fill-primary",
    tertiary: "fill-tertiary",
  };

  return (
    <svg
      width="19"
      height="17"
      viewBox="0 0 19 17"
      xmlns="http://www.w3.org/2000/svg"
      className={`${colorVariants[color]}`}>
      <path d="M9.5 12C9.77614 12 10 12.2239 10 12.5V14H18.5L18.6006 14.0098C18.8286 14.0563 19 14.2583 19 14.5C19 14.7417 18.8286 14.9437 18.6006 14.9902L18.5 15H10V16.5C10 16.7761 9.77614 17 9.5 17C9.22386 17 9 16.7761 9 16.5V12.5C9 12.2239 9.22386 12 9.5 12ZM6.5 14C6.77614 14 7 14.2239 7 14.5C7 14.7761 6.77614 15 6.5 15H0.5C0.223858 15 0 14.7761 0 14.5C0 14.2239 0.223858 14 0.5 14H6.5ZM5.5 6C5.77614 6 6 6.22386 6 6.5V10.5C6 10.7761 5.77614 11 5.5 11C5.22386 11 5 10.7761 5 10.5V9H0.5C0.223858 9 0 8.77614 0 8.5C0 8.22386 0.223858 8 0.5 8H5V6.5C5 6.22386 5.22386 6 5.5 6ZM18.5 8C18.7761 8 19 8.22386 19 8.5C19 8.77614 18.7761 9 18.5 9H8.5C8.22386 9 8 8.77614 8 8.5C8 8.22386 8.22386 8 8.5 8H18.5ZM12.5 0C12.7761 -4.62582e-05 13 0.223858 13 0.5V2H18.5C18.7761 2 19 2.22386 19 2.5C19 2.77614 18.7761 3 18.5 3H13.001V4.5C13.001 4.7761 12.7771 4.99988 12.501 5C12.2248 5.00005 12.001 4.77614 12.001 4.5L12 0.5C12 0.223935 12.2239 4.62564e-05 12.5 0ZM10.5 2C10.7761 2 11 2.22386 11 2.5C11 2.77614 10.7761 3 10.5 3H0.5C0.223858 3 0 2.77614 0 2.5C0 2.22386 0.223858 2 0.5 2H10.5Z" />
    </svg>
  );
};

const ArtworkCard = () => (
  <li className={"flex items-center gap-4 w-full"}>
    <div className={"rounded-2xl overflow-hidden h-30 w-30 aspect-square "}>
      <img src={"../images/artists_example.png"} className={"w-full h-full object-cover"} alt={"Preview"} />
    </div>
    <div>
      <ul className={"flex flex-col"}>
        <li className={"text-secondary font-medium mb-1"}>Nome artista</li>
        <li className={"text-teriary text-2xl font-medium mb-2"}>Nome opera</li>
        <li className={"text-secondary font-medium"}>Nome della galleria</li>
      </ul>
    </div>
  </li>
);

const MessagesCard = ({ hasNotification, date }: { hasNotification: boolean; date: string }) => (
  <li className={"p-4 flex items-center w-full gap-2"}>
    <div className={"overflow-hidden rounded-full h-12 min-w-12 border border-secondary/70 aspect-square"}>
      <img src="../images/gallery-logo-example.png" alt="Gallery preview" className=" h-full w-full object-cover" />
    </div>
    <div className={"flex flex-col space-y-1"}>
      <span>Galleria Lorem Ipsum</span>
      <p className={"text-secondary text-xs"}>Messaggio lorem ipsum dolor sit consweh...</p>
    </div>
    <div className={`flex flex-col  text-xs space-y-2 ${hasNotification ? "text-primary" : "text-secondary"}`}>
      <span>{date}</span>
      {hasNotification && <span className={"bg-primary text-white px-2.5 py-1 rounded-full"}>1</span>}
    </div>
  </li>
);

interface SidePanelProps {
  open?: boolean;
  onClose?: () => void;
}

const SidePanel = ({ open = true, onClose }: SidePanelProps) => {
  const [tab, setTab] = useState<"like" | "match">("like");
  const [filtersPanelOpen, setFiltersPanelOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleFiltersPanelOpen = () => {
    setFiltersPanelOpen(!filtersPanelOpen);
  };

  const panelContent = (
    <aside className={"h-screen rounded-r-2xl w-full max-w-xs lg:max-w-sm bg-white pt-38 lg:pt-30 px-6 pb-12 overflow-y-hidden"}>
      <Button className={"custom-navbar flex items-center gap-2.5 py-6!"} onClick={handleFiltersPanelOpen}>
        <FilterIcon color={filtersPanelOpen ? "primary" : "tertiary"} />
        <span className={`${filtersPanelOpen ? "text-primary" : "text-tertiary"}`}>Filtri</span>
      </Button>
      {filtersPanelOpen ? (
        <FiltersPanel />
      ) : (
        <div className="flex flex-col h-full">
          <nav className={"flex items-center mt-12 "}>
            <ul className={"flex items-center justify-center w-full "}>
              <li
                className={`flex items-center justify-center w-full ${
                  tab == "like" ? "border-primary border-b-2" : "text-tertiary border-b"
                }`}>
                <button
                  className={`py-2.5 cursor-pointer ${tab == "like" ? "text-primary" : "text-tertiary"}`}
                  onClick={() => setTab("like")}>
                  Like
                </button>
              </li>
              <li
                className={`flex items-center justify-center w-full ${
                  tab == "match" ? "border-primary border-b-2" : "text-tertiary border-b"
                }`}>
                <button
                  className={`py-2.5 cursor-pointer ${tab == "match" ? "text-primary" : "text-tertiary"}`}
                  onClick={() => setTab("match")}>
                  Match
                </button>
              </li>
            </ul>
          </nav>
          <div className={"overflow-y-auto flex-1"}>
            {tab === "like" && (
              <ul className={"flex flex-col mt-8 space-y-6"}>
                <ArtworkCard />
                <ArtworkCard />
                <ArtworkCard />
              </ul>
            )}
            {tab === "match" && (
              <ul className={"flex flex-col mt-8 space-y-6 bg-[#FAFAFB] "}>
                <MessagesCard hasNotification={true} date={"Ieri"} />
                <MessagesCard hasNotification={true} date={"Ieri"} />
                <MessagesCard hasNotification={false} date={"Mercoledì"} />
                <MessagesCard hasNotification={false} date={"Mercoledì"} />
                <MessagesCard hasNotification={false} date={"Martedì"} />
                <MessagesCard hasNotification={false} date={"Lunedì"} />
              </ul>
            )}
          </div>
        </div>
      )}
    </aside>
  );

  // Su mobile: mostra come Drawer
  if (isMobile) {
    return (
      <Drawer anchor="left" open={open} onClose={onClose}>
        {panelContent}
      </Drawer>
    );
  }

  // Su desktop: mostra sempre fisso
  return panelContent;
};

export default SidePanel;
