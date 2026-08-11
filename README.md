# sn17-cdn

Public delivery bucket for Bittensor Subnet 17 (404-GEN) round submissions.

The subnet's `submission-collector` downloads each prompt's generated Three.js
module anonymously from `<cdn_url>/<stem>.js` during the DOWNLOADING stage. A
file that 404s counts as a failed prompt, and a failed prompt loses to every
other miner on that prompt — so this repo exists purely to serve those files
over plain HTTPS with no credentials.

Generated output only. The pipeline that produces it lives elsewhere.
