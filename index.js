class App  {
    constructor(selectors) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
       
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()                           
                this.handleSubmit(ev)
            })
    }

    renderListItem(flick) {
        // const item = document.createElement('li')
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        // item.textContent = flick.name
        item
            .querySelector('.flickName')
            .textContent = flick.name

        item
            // .querySelector('button.alert')
            // .addEventListener('click', ev =>  {
            //     ev.preventDefault()
            //     this.removeItem(ev)
            // })
            .querySelector('button.alert')
            .addEventListener('click', this.removeItem.bind(this, flick))

        item    
            .querySelector('button.warning')
            .addEventListener('click', ev =>  {
                ev.preventDefault()
                this.favFlick(ev)
            })

        return item
    }


    removeItem(flick, ev) {
        const listItem = ev.target.closest('.flick')
        listItem.remove()
        
        // for(i = 0; i < this.flicks.length; i++) {
        //     if(this.flicks[i].id.toString() == li.dataset.id) {
        //         this.flicks.splice(this.flicks.indexOf(listItem), 1)
        //     }
        //   }

        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i, 1)

    }
    
    favFlick(ev) {
      const listItem = ev.target.closest('.flick')
      listItem.style.backgroundColor = "darkred" 

      for(i = 0; i < this.flicks.length; i++) {
        if(this.flicks[i].id.toString() == listItem.dataset.id) {
            this.flicks[i].fav = true
        }
      }
    }

    handleSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
            fav: false
        }

        // this.flicks.push(flick)
        this.flicks.unshift(flick)
        
        const item = this.renderListItem(flick)
        // this.list.appendChild(item)
        this.list.insertBefore(item, this.list.firstElementChild)


        f.reset()
    }
}

const app = new App({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})

// app.init('#flickForm')
// app.init({
//     formSelector: '#flickForm',
//     listSelector: '#flickList',
//     templateSelector: '.flick.template',
// })