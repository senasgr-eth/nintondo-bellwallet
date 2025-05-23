import s from "../styles.module.scss";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import cn from "classnames";
import {
  useGetCurrentAccount,
  useGetCurrentWallet,
} from "@/ui/states/walletState";
import { SettingsIcon } from "@/ui/icons/Setting";
import { SidePanelIcon } from "@/ui/icons/SidePanel";

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

// Function to generate a random gradient based on a string
const generateGradient = (str: string) => {
  const color1 = stringToColor(str);
  const color2 = stringToColor(str.split("").reverse().join(""));
  return `linear-gradient(45deg, ${color1}bb, ${color2}bb)`;
};

const WalletPanel = () => {
  const currentWallet = useGetCurrentWallet();
  const currentAccount = useGetCurrentAccount();

  const onSidePanelClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const { id: tabId } = tabs[0];

    if (tabId) {
      await chrome.sidePanel.setOptions({
        enabled: true,
        path: "index.html",
        tabId,
      });
      await chrome.sidePanel.setPanelBehavior({
        openPanelOnActionClick: false,
      });
      await chrome.sidePanel.open({
        tabId,
      });
    }

    window.close();
  };

  return (
    <div className="flex justify-between mt-2 items-center mb-4">
      <Link
        className="flex gap-2 items-center select-none cursor-pointer"
        to={"/pages/switch-wallet"}
      >
        <div
          className="bg-gradient-to-br rounded-full size-7 flex items-center justify-center"
          style={{
            backgroundImage: generateGradient(
              currentAccount?.address ?? "account"
            ),
          }}
        />
        <div className="flex gap-2 items-center">
          <div className={s.change}>
            {(currentWallet?.name.length ?? 0) > 9
              ? currentWallet?.name.slice(0, 9).toLocaleLowerCase() + "..."
              : currentWallet?.name ?? "wallet"}{" "}
          </div>
          <ChevronDownIcon className="w-3 h-3" />
        </div>
      </Link>

      <div className="flex gap-3 items-center">
        <Link
          to={"/pages/inscriptions"}
          className="cursor-pointer flex items-center justify-center"
        >
          <img src="/nft.png" alt="nft" className={cn("w-12", s.nftImage)} />
        </Link>
        <div className="w-[1px] bg-white bg-opacity-25 h-5" />
        <button className="cursor-pointer" onClick={onSidePanelClick}>
          <SidePanelIcon className="size-5" />
        </button>
        <div className="w-[1px] bg-white bg-opacity-25 h-5" />
        <Link to={"/pages/settings"} className="cursor-pointer">
          <SettingsIcon className="size-5 hover:rotate-90 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default WalletPanel;
