# dns-domain

A JavaScript library for checking the validity of DNS names.

## Usage example

<details data-mdrb>
<summary>Basic usage:</summary>

<pre>
description = '''
Create DNS name objects, and list the allowed and disallowed TLDs.
'''
</pre>
</details>

```javascript
import { DnsDomain, effective_toplevel_domains } from 'https://esm.sh/gh/doga/dns-domain@1.0.0/mod.mjs';

// create a domain object under an allowed top-level domain
try{
  console.group('Check whether these DNS domain names have an allowed TLD as direct parent:');

  [
    'vocab.qworum.net', 'qworum.net', 
    'mañana.rocks', 'xn--maana-pta.rocks', // Unicode and Punycode representations of the same domain name
  ]
  .map(dnsDomainStr => new DnsDomain(dnsDomainStr))
  .forEach(
    dnsDomain => console.info(`"${dnsDomain}":`, dnsDomain.isDirectTldSubdomain())
  );

  console.groupEnd();
}catch(error){
  // a domain has wrong format or is not under an allowed top-level domain
  console.error(`${error}`);
}

// Print out effective_toplevel_domains.
console.group(`All allowed top-level domains:`);
for (const domainStr of effective_toplevel_domains.included) {
  console.info(`"${domainStr}"`);
}
console.groupEnd();

console.group(`All disallowed top-level domains:`);
for (const domainStr of effective_toplevel_domains.excluded) {
  console.info(`"${domainStr}"`);
}
console.groupEnd();
```

Sample output for the code above:

```text
Check whether these DNS domain names have an allowed TLD as direct parent:
    "vocab.qworum.net": false
    "qworum.net": true
    "mañana.rocks": true
    "mañana.rocks": true
All allowed top-level domains:
    "ac"
    "com.ac"
    "edu.ac"
    ...
    "noip.me"
    "webhop.me"
    "bounceme.net"
    "ddns.net"
    "eating-organic.net"
    "mydissent.net"
    "myeffect.net"
    "mymediapc.net"
    "mypsx.net"
    "mysecuritycamera.net"
    "nhlfan.net"
    "no-ip.net"
    "pgafan.net"
    "privatizehealthinsurance.net"
    "redirectme.net"
    "serveblog.net"
    "serveminecraft.net"
    "sytes.net"
    "cable-modem.org"
    "collegefan.org"
    "couchpotatofries.org"
    "hopto.org"
    ...
All disallowed top-level domains:
    ...
    "sch.uk"
    "on-acorn.io"
    "dev.adobeaemcloud.com"
    "compute.estate"
    "alces.network"
    "compute.amazonaws.com.cn"
    "compute.amazonaws.com"
    "compute-1.amazonaws.com"
    "cn-north-1.airflow.amazonaws.com.cn"
    "cn-northwest-1.airflow.amazonaws.com.cn"
    "af-south-1.airflow.amazonaws.com"
    "ap-east-1.airflow.amazonaws.com"
    "ap-northeast-1.airflow.amazonaws.com"
    "ap-northeast-2.airflow.amazonaws.com"
    "ap-northeast-3.airflow.amazonaws.com"
    "ap-south-1.airflow.amazonaws.com"
    "ap-south-2.airflow.amazonaws.com"
    "ap-southeast-1.airflow.amazonaws.com"
    "ap-southeast-2.airflow.amazonaws.com"
    "ap-southeast-3.airflow.amazonaws.com"
    "ap-southeast-4.airflow.amazonaws.com"
    "ca-central-1.airflow.amazonaws.com"
    "ca-west-1.airflow.amazonaws.com"
    "eu-central-1.airflow.amazonaws.com"
    "eu-central-2.airflow.amazonaws.com"
    "eu-north-1.airflow.amazonaws.com"
    "eu-south-1.airflow.amazonaws.com"
    "eu-south-2.airflow.amazonaws.com"
    "eu-west-1.airflow.amazonaws.com"
    ...
```

### Running the usage example

Run the example above by typing this in your terminal (requires [Deno](https://deno.com/) 2+):

```shell
deno run --allow-net --allow-run --allow-env --allow-read jsr:@andrewbrey/mdrb@3.0.4 --dax=false --mode=isolated https://raw.githubusercontent.com/doga/dns-domain/refs/heads/main/README.md
```

∎
