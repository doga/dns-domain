import effective_toplevel_domains from "./effective-toplevel-domains.mjs";
import { punycode } from "../deps.mjs";

/**
 * A DNS domain name that is a subdomain of an allowed TLD.
 */
class DnsDomain {
  /**
   * A domain name string in Unicode.
   * @type {string}
   */
  #dnsDomain;

  /**
   * The domain name string.
   * @returns {string}
   */
  get dnsDomain(){return this.#dnsDomain;}

  /**
   * Creates a DNS name object. DNS names that are encoded in punycode are decoded as Unicode strings.
   * @param {string} dnsDomain 
   * @throws {TypeError}
   */
  constructor(dnsDomain) {
    if (!(
      // domain is a string
      typeof dnsDomain === 'string' &&

      // domain looks about right
      dnsDomain.match(/^\S+$/) && !dnsDomain.match(/\.\./) && !dnsDomain.match(/^\./) && !dnsDomain.match(/\.$/)
    )) throw new TypeError(`DNS domain name is not a string that matches a domain name: ${dnsDomain}`);

    dnsDomain = punycode.toUnicode(dnsDomain);

    if (!(
      // domain has an allowed tld as ancestor
      effective_toplevel_domains.included.find(
        d => dnsDomain.endsWith(`.${d}`)
      ) &&
      !effective_toplevel_domains.excluded.find(
        d => dnsDomain.endsWith(`.${d}`)
      )
    )) throw new TypeError(`DNS domain name does not have an allowed TLD as ancestor: ${dnsDomain}`);

    this.#dnsDomain = dnsDomain;
  }

  /**
   * Checks whether the DNS domain name has an allowed TLD direct parent.
   * @returns {boolean}
   */
  isDirectTldSubdomain(){
    return (
      (
        effective_toplevel_domains.included.find(
          d => (
            this.dnsDomain.endsWith(`.${d}`) &&
            !(
              this.dnsDomain.substring(0, this.dnsDomain.length - d.length - 1)
            ).match(/\./)
          )
        ) && true
      ) || false
    );
  }

  /**
   * Returns the domain name string.
   * @returns {string}
   */
  toString(){
    return this.dnsDomain;
  }
}

export default DnsDomain;
export {DnsDomain};
