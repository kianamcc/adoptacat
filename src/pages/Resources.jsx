import React from "react";
import "./Resources.css";

const Resources = () => {
  return (
    <div className="resources-container">
      <h1 className="resources-title">Donate Now!</h1>
      <p className="resources-subtitle">
        There are millions of animals in shelters awaiting your help...
        <br />
        Click on any of the organisations below to be taken to their donation
        page.
      </p>
      <div className="resources-flex-container">
        <div className="resource-1 resources-flex-item">
          <a
            className="donation-link"
            href="https://petfinderfoundation.com/donate/"
          >
            Petfinder
          </a>
        </div>
        <div className="resource-2 resources-flex-item">
          <a
            className="donation-link"
            href="https://support.bestfriends.org/site/Donation2?df_id=3818&mfc_pref=T&3818.donation=form1&gclid=CjwKCAjw6dmSBhBkEiwA_W-EoLkCOCS9sNjDhqr8uDmrqCBRBeC0pL4-_QNcJ3v5B5YfuQCCXI_yexoCXVQQAvD_BwE&gclsrc=aw.ds"
          >
            Best Friends Animal Society
          </a>
        </div>
        <div className="resource-3 resources-flex-item">
          <a
            className="donation-link"
            href="https://secured.humanesociety.org/page/81880/donate/1?ea.profile.id=37611&transaction.donationAmt=40&ea.tracking.id=ad_gg_branded&en_txn10=ad_gg_cpc_120727562_7704793562_495382227104_humane%20society%20of%20the%20united%20states&en_og_source=ad_gg_fndr_81880_hsus&utm_source=google&utm_medium=cpc&utm_term=humane%20society%20of%20the%20united%20states&gclid=CjwKCAjw6dmSBhBkEiwA_W-EoKjmgZLADJmMa0BkwrirWlA6Gjtbz2SQJhXKimCgmXL8jysL6YKtCRoCnmEQAvD_BwE"
          >
            The Humane Society of The United States
          </a>
        </div>
        <div className="resource-4 resources-flex-item">
          <a
            className="donation-link"
            href="https://americanhumane.salsalabs.org/support/index.html?sl_tc=0122_website_topnav&utm_source=AH+Website&utm_medium=website&utm_campaign=FY22+New+Year&utm_content=website+top+nav"
          >
            American Humane
          </a>
        </div>
        <div className="resource-5 resources-flex-item">
          <a
            className="donation-link"
            href="https://secure.petsmartcharities.org/give/219478/#!/donation/checkout?c_src=pci_web&c_src2=donate_redirect"
          >
            PetSmart Charities
          </a>
        </div>
        <div className="resource-6 resources-flex-item">
          <a
            className="donation-link"
            href="https://getinvolved.alleycat.org/site/Donation2?df_id=9083&9083.donation=form1&mfc_pref=T&s_src=a1oxxxwdbcn&autologin=true&gclid=CjwKCAjw6dmSBhBkEiwA_W-EoG5_oXb5jZlgpEQZs-8GUkMvmpKfYeThcEzzFHP3djG6ssYxp3yh1BoCbZEQAvD_BwE"
          >
            Alley Cat Allies
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resources;
