import { browserTabsCreate } from "@/shared/utils/browser";
import { Link, useParams } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/24/solid";

import s from "./styles.module.scss";
import { t } from "i18next";
import { BELLS_API_URL } from "@/shared/constant";

const FinalleSend = () => {
  const { txId } = useParams();

  const onClick = async () => {
    await browserTabsCreate({
      active: true,
      url: `${BELLS_API_URL}/tx/${txId}`,
    });
  };

  return (
    <div className={s.container}>
      <div className={s.resultContainer}>
        <div className={s.resultIconContainer}>
          <CheckIcon className={s.resultIcon} />
        </div>
        <h3 className={s.result}>{t("send.finalle_send.success")}</h3>
      </div>

      <div className={s.btnContainer}>
        <Link to={"/home"} className="btn primary w-full">
          {t("send.finalle_send.back")}
        </Link>
        <button
          className={s.btn}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={onClick}
        >
          {t("send.finalle_send.explorer")}
        </button>
      </div>
    </div>
  );
};

export default FinalleSend;
