
<script type="text/ecmascript-6">
export default {
  name: 'Uploadcom',
  components: {

  },
  data() {
    return {
      filedom: '',
      filetext: ''
    }
  },
  created() {

  },
  destroyed() {

  },
  methods: {
    clickHandler() {

    },
    addupload() {
      const attrsobj = {
        type: 'file',
        style: 'display:none'
      }
      if (this.filedom) { this.filedom.parentNode.removeChild(this.filedom) }
      this.filedom = document.createElement('input')

      Object.keys(attrsobj).forEach(element => {
        this.filedom.setAttribute(`${element}`, attrsobj[ element ])
      })
      const contener = document.getElementById('unloadstyle')
      contener.appendChild(this.filedom)
      contener.lastChild.click()
      contener.lastChild.addEventListener('change', (e) => {
        this.filetext = e.target.files[ 0 ].name
      })
    }
  },
  render(h) {
    return h('div', {
      style: {
        draggable: 'true'
      },
      attrs: {
        id: 'unloadstyle-main'
      }
    }, [
      '',
      h('div', {
        style: {
          draggable: 'true'
        },
        attrs: {
          id: 'unloadstyle',
          ref: 'unloadstyle'
        },
        on: {
          drop: (e) => { }
        }
      }, [
        '',
        h('i', {
          attrs: {
            class: 'el-icon-plus'
          },
          on: {
            click: this.addupload
          }
        })
      ]),
      [
        '',
        h('span', {
          style: {
            float: 'right'
          }
        }, this.filetext),
        h('el-button', {
          attrs: {
            type: 'primary',
            size: 'mini'
          },
          style: {
            margin: '10px 0 10PX 10px',
            float: 'right'
          }
        }, '提交')

      ]
    ])
  }
}
</script>

<style scoped lang="scss">
#unloadstyle-main {
  #unloadstyle {
    height: 100px;
    width: 120px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border-color: #409eff;
    }
    .el-icon-plus {
      font-size: 30px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
