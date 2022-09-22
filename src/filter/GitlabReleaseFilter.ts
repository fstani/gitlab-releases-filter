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
    const unavailable_xpath = `//div[contains(@class, 'badge-container-type') and text()='${tier}']/following-sibling::div/a/div[text()='${license}' and not(contains(@class,"available"))]/ancestor::div[contains(@class, "release-row") and not(contains(@class, "divider")) or contains(@class, "secondary-column-feature")]`;

    const un = document.evaluate(unavailable_xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    
    try {
      let thisNode = un.iterateNext();
      affected++;
    
      while (thisNode) {
        (thisNode as HTMLElement).style.display = "none";
        thisNode = un.iterateNext();
        affected++;
      }
    }
    catch(e) {
      console.error(`Error: Document tree modified during iteration ${e}`);
    }
  }

  return affected;
}