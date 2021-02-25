export default {
  methods: {
    updatacom() {
      // eslint-disable-next-line prefer-const

      const attrsobj = {
        type: 'file',
        style: 'display:none'
      }

      if (this.filedom) { this.filedom.parentNode.removeChild(this.filedom) }
      this.filedom = document.createElement('input')

      Object.keys(attrsobj).forEach(element => {
        this.filedom.setAttribute(`${element}`, attrsobj[ element ])
      })
      const contener = document.getElementById('app')
      contener.appendChild(this.filedom)
      contener.lastChild.click()
      contener.lastChild.addEventListener('change', (e) => {
        // this.filetext = e.target.files[ 0 ].name
        this.tableData.push({
          date: '2016-05-02 15:33:33',
          name: 'test-003',
          desc: 'appliaca_cwdadaww',
          copy: '5',
          edition: 'cpu平均利用率:12%',
          status: 'upload'
        })
      })
    }
  }
}
