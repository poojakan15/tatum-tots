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
        const nameSpan = item.querySelector('.flickName')
        nameSpan.textContent = flick.name
        nameSpan.addEventListener(
            'keypress',
            this.saveOnEnter.bind(this, flick)
        )

        item
            .querySelector('.remove.button')
            .addEventListener(
                'click', 
                this.removeFlick.bind(this, flick)
            )

        item    
            .querySelector('.fav.button')
            .addEventListener(
                'click',
                this.favFlick.bind(this, flick)
            )

        item    
            .querySelector('.edit.button')
            .addEventListener(
                'click',
                this.editFlick.bind(this, flick)
            )
        
        item    
            .querySelector('.up.button')
            .addEventListener(
                'click',
                this.moveUp.bind(this, flick)
            )

        item    
            .querySelector('.down.button')
            .addEventListener(
                'click',
                this.moveDown.bind(this, flick)
            )

        return item
    }


    removeFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        listItem.remove()

        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i, 1)
    }
    
    favFlick(flick, ev) {
        const listItem = ev.target.closest('.flick')
        flick.fav = listItem.classList.toggle('fav')
    }

    editFlick(flick, ev) {
        // const btn = ev.target
        const listItem = ev.target.closest('.flick')
        const btn = listItem.querySelector('.edit.button')
        const nameField = listItem.querySelector('.flickName')

        if(nameField.isContentEditable) {
            // no longer editable
            nameField.contentEditable = false
            btn.textContent = 'Edit'
            btn.classList.remove('success')

            // save 
            flick.name = nameField.textContent
        } else {
            // editable
            nameField.contentEditable = true
            nameField.focus()
            btn.textContent = 'Save'
            btn.classList.add('success')
        }
    }

    moveUp(flick, ev) {
        const flickId = flick.id.toString()
        const listItem = ev.target.parentNode.parentNode
        const index = this.flicks.indexOf(flick)

        if(index > 0)
        {
            const swap= this.flicks[index - 1]
            this.flicks[index] = swap
            this.flicks[index - 1] = flick

            this.list.insertBefore(
                listItem, 
                listItem.previousElementSibling
            )
        }
    }

    moveDown(flick, ev) {
        const flickId = flick.id.toString()
        const listItem = ev.target.parentNode.parentNode
        const index = this.flicks.indexOf(flick)

        if(index < this.flicks.length - 1)
        {
            const swap = this.flicks[index + 1]
            this.flicks[index] = swap
            this.flicks[index + 1] = flick

            this.list.insertBefore(
                listItem.nextElementSibling, 
                listItem
            )
        }
    }

    saveOnEnter(flick, ev) {
        if(ev.key === 'Enter') {
            this.editFlick(flick, ev)
        }
    }

    handleSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.flickName.value,
            fav: false,
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
