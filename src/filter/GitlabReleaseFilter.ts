export enum Licenses {
  all = 'All',
  free = 'FREE',
  premium  = 'PREMIUM',
  ultimate = 'ULTIMATE'
}

export enum Tiers {
  all = 'All',
  saas = 'SaaS',
  self = 'Self-Managed'
}

interface FilterProp {
  tier: Tiers,
  license: Licenses
}

export const filterReleasePage = ({tier = Tiers.all, license = Licenses.all}: FilterProp): number => {
  // Reverts any hidden features
  document.querySelectorAll('.secondary-column-feature,.release-row').forEach((elem) => (elem as HTMLElement).style.display = '');
  let affected = 0;

  if (tier !== Tiers.all || license !== Licenses.all) {
    let tierFilter = ``;
    if (tier !== Tiers.all) {
      tierFilter = ` and text()='${tier}'`;
    }
    let licenseFilter = ``;
    if (licenseFilter !== Licenses.all) {
      licenseFilter = `text()='${license}' and `;
    }
  
    const unavailable_xpath = `//div[contains(@class, 'badge-container-type')${tierFilter}]/following-sibling::div/a/div[${licenseFilter}not(contains(@class,"available"))]/ancestor::div[contains(@class, "release-row") and not(contains(@class, "divider")) or contains(@class, "secondary-column-feature")]`;

    const unavailable = document.evaluate(unavailable_xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    
    try {
      let thisNode = unavailable.iterateNext();
      affected++;
    
      while (thisNode) {
        (thisNode as HTMLElement).style.display = "none";
        thisNode = unavailable.iterateNext();
        affected++;
      }
    }
    catch(e) {
      console.error(`Error: Document tree modified during iteration ${e}`);
    }
  }

  return affected;
}