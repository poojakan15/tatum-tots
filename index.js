const app = {
    init(selectors) {
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
    }, 

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
            .querySelector('button.alert')
            .addEventListener('click', this.removeItem)

        item    
            .querySelector('button.warning')
            .addEventListener('click', this.favFlick)

        return item
    },

    removeItem(ev) {
        const listItem = ev.target.closest('.flick')
        listItem.remove()
        this.flicks.splice(this.flicks.indexOf(listItem), 1)
    },
    
    favFlick(ev) {
      const listItem = ev.target.closest('.flick')
      listItem.style.backgroundColor = "darkred"  
    },

    handleSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
        }

        // this.flicks.push(flick)
        this.flicks.unshift(flick)
        
        const item = this.renderListItem(flick)
        // this.list.appendChild(item)
        this.list.insertBefore(item, this.list.firstElementChild)

        f.reset()
    },
}

// app.init('#flickForm')
app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})