import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

/**
 * @params dom       需要托管得dom对象
 * @params isattach  是否可与docker交互
 * @params httpURI
 * @params socketURI
 */

/**
  * Xterm.js is a front-end component written in TypeScript that lets applications bring fully-featured terminals to their users in the browser. It’s used by popular projects such as VS Code, Hyper and Theia.
  * demo:https://xtermjs.org/
  *
  */
class Xterms {
  constructor(
    {
      dom,
      isattach = false,
      socketURI,
      httpURI
    }
  ) {
    this.obj = arguments[0]
    this.term
    this.socket
  }

  init() {
    const { isattach, socketURI, httpURI} = this.obj

    if (isattach) {
      this.newsocket(socketURI)
    } else {
      this.newhttp(httpURI)
    }
  }
  initterm({
    isfit = false,
    data
  }) {
    const {dom} = this.obj
    const fitAddon = new FitAddon()
    this.term = new Terminal(
      {
        fontSize: 12,
        cursorBlink: true,
        // RendererType: 'canvas',
        theme: { // anotherWay :obj.setOption(theme:{pointerColor:''})
          pointerColor: 'white',
          pointerColorBackground: 'black',
          cursor: 'yellow',
          ursorBlink: true
        }
      }
    )
    this.term.loadAddon(fitAddon)
    if (isfit) {
      const attachAddon = new AttachAddon(this.socket)
      this.term.loadAddon(attachAddon)
      this.term.open(dom)
      fitAddon.fit()
      this.term.focus()
    } else {
      this.term.open(dom)
      fitAddon.fit()
      this.term.write(data)
    }
  }
  newsocket(socketURI) {
    if (!socketURI) return
    this.socket = new WebSocket(socketURI)
    this.socketOnclose()
    this.socketOnopen()
    this.socketOnErroe()
  }
  socketOnclose() {
    this.socket.onclose = () => {}
  }
  socketOnopen() {
    this.socket.open = () => {
      this.initterm({
        isfit: true
      })
    }
  }
  socketOnErroe() {
    this.socket.onerror = () => {}
  }
  newhttp() {
    Promise.resolve(
      // eslint-disable-next-line no-multi-str
      "nitializing database \r\n\
2019-03-24T08:48:19.102726Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).\r\n\
2019-03-24T08:48:20.241459Z 0 [Warning] InnoDB: New log files created, LSN=45790 \r\n\
2019-03-24T08:48:20.414933Z 0 [Warning] InnoDB: Creating foreign key constraint system tables.\r\n\
2019-03-24T08:48:20.509897Z 0 [Warning] No existing UUID has been found, so we assume that this is the first time that this server has been started. Generating a new UUID: 935a6ee7-4e11-11e9-b135-0242ac110002.\r\n\
2019-03-24T08:48:20.519148Z 0 [Warning] Gtid table is not ready to be used. Table 'mysql.gtid_executed' cannot be opened.\r\n\
2019-03-24T08:48:20.519843Z 1 [Warning] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option. \r\n\
2019-03-24T08:48:24.066683Z 1 [Warning] 'user' entry 'root@localhost' ignored in --skip-name-resolve mode. \r\n\
2019-03-24T08:48:24.066730Z 1 [Warning] 'user' entry 'mysql.session@localhost' ignored in --skip-name-resolve mode. \r\n\
2019-03-24T08:48:24.066740Z 1 [Warning] 'user' entry 'mysql.sys@localhost' ignored in --skip-name-resolve mode. \r\n\
2019-03-24T08:48:24.066756Z 1 [Warning] 'db' entry 'performance_schema mysql.session@localhost' ignored in --skip-name-resolve mode. \r\n\
2019-03-24T08:48:24.066761Z 1 [Warning] 'db' entry 'sys mysql.sys@localhost' ignored in --skip-name-resolve mode. \r\n\
2019-03-24T08:48:24.066772Z 1 [Warning] 'proxies_priv' entry '@ root@localhost' ignored in --skip-name-resolve mode.\r\n\
2019-03-24T08:48:24.066814Z 1 [Warning] 'tables_priv' entry 'user mysql.session@localhost' ignored in --skip-name-resolve mode.\r\n\
2019-03-24T08:48:24.066822Z 1 [Warning] 'tables_priv' entry 'sys_config mysql.sys@localhost' ignored in --skip-name-resolve mode. \r\n\
Database initialized "
    ).then(res => {
      this.initterm({
        data: res
      })
    })
  }
  close() {
    if (!this.socket) return
    this.socket.close()
  }
}

export default Xterms
