import "./style.css";

import typescriptLogo from "./typescript.svg";

async function requestData(path: string, method: string) {
  const res = await fetch(path, {
    method,
    headers: {
      "Authentication": "Bearer token"
    }
  })
  const data = await res.json()
  return data
}

async function enableMocking() {
  // const { worker } = await import('./mock/browser')
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  // return worker.start()
  return new Promise(resolve => resolve())
}

enableMocking().then(() => {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <button id="server-data-post" type="button">Post Server Data</button>
    <button id="mock-data" type="button">Get Mock Data</button>
  </div>
`;

  document.querySelector("#server-data-post")!.addEventListener("click", async () => {
    const data = await requestData("/search:create", "post")
    console.log(data)
  })
  document.querySelector("#mock-data")!.addEventListener("click", async () => {
    const data = await requestData("/mock", "get")
    console.log(data)
  })
})

