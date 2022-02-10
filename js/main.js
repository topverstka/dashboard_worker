
// Служебные переменные
const d = document;
const body = document.querySelector('body');

// Служебные функции

function find(selector) {
	return document.querySelector(selector)
}

function findAll(selectors) {
	return document.querySelectorAll(selectors)
}

// Удаляет у всех элементов items класс itemClass
function removeAll(items,itemClass) {   
    if (typeof items == 'string') {
      items = document.querySelectorAll(items)
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      item.classList.remove(itemClass)
    }
}

// Получаем все соседние элементы
function getSiblings(elem) {
    var siblings = [];
    var sibling = elem;
    while (sibling.previousSibling) {
        sibling = sibling.previousSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }

    sibling = elem;
    while (sibling.nextSibling) {
        sibling = sibling.nextSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }

    return siblings;
}

function bodyLock(con) {
    if (con === true) {
        body.classList.add('_lock');
    } else if (con === false) {
        body.classList.remove('_lock');
    } else if (con === undefined) {
		if (!body.classList.contains('_lock')) {
			body.classList.add('_lock');
		}
		else {
			body.classList.remove('_lock')
		}
	} else {
		console.error('Неопределенный аргумент у функции bodyLock()')
	}
}

$('[name="date-start"]').daterangepicker({
    autoApply: true,
    singleDatePicker: true,
    minYear: 2020, // Раньше этого года пользователь не может выбрать
    locale: {
        format: 'DD.MM.YYYY'
    }
});

$('[name="date-end"]').daterangepicker({
    autoApply: true,
    singleDatePicker: true,
    minYear: 2020, // Раньше этого года пользователь не может выбрать
    locale: {
        format: 'DD.MM.YYYY'
    }
});

$('[data-select-date]').on('show.daterangepicker', e => {
    e.currentTarget.parentElement.classList.add('_show-daterangepicker')
})

$('[data-select-date]').on('hide.daterangepicker', e => {
    e.currentTarget.parentElement.classList.remove('_show-daterangepicker')
})

// Функции для модальных окон
modal()
function modal() {
    
    // Открытие модальных окон при клике по кнопке
    openModalWhenClickingOnBtn()
    function openModalWhenClickingOnBtn() {
        const btnsOpenModal = document.querySelectorAll('[data-modal-open]');
    
        for (let i = 0; i < btnsOpenModal.length; i++) {
            const btn = btnsOpenModal[i];
    
            btn.addEventListener('click', (e) => {
                const dataBtn = btn.dataset.modalOpen;
                const modal = document.querySelector(`#${dataBtn}`)

                openModal(modal)
                window.location.hash = dataBtn
            });
        }
    }

    // Открытие модального окна, если в url указан его id
    openModalHash()
    function openModalHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1)
            const modal = document.querySelector(`.modal#${hash}`)
    
            if (modal) openModal(modal)
        }
    }

    // Показываем/убираем модальное окно при изменения хеша в адресной строке
    checkHash()
    function checkHash() {
        window.addEventListener('hashchange', e => {
            const hash = window.location.hash
            const modal = document.querySelector(`.modal${hash}`)

            if (find('.modal._show')) find('.modal._show').classList.remove('_show')
            if (modal && hash != '') openModal(modal)
        })
    }

    // Закрытие модального окна при клике по заднему фону
    closeModalWhenClickingOnBg()
    function closeModalWhenClickingOnBg() {
        document.addEventListener('click', (e) => {
            const target = e.target
            const modal = document.querySelector('.modal._show')

            if (modal && target.classList.contains('modal__body')) closeModal(modal)
        })
    }

    // Закрытие модальных окон при клике по крестику
    closeModalWhenClickingOnCross()
    function closeModalWhenClickingOnCross() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
            const closeThisModal = modal.querySelector('.modal__close')
    
            closeThisModal.addEventListener('click', () => {
                closeModal(modal)
            })
        }
    }

    // Закрытие модальных окон при нажатии по клавише ESC
    closeModalWhenClickingOnESC()
    function closeModalWhenClickingOnESC() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
    
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') closeModal(modal)
            })
        }
    }

    // Сброс id модального окна в url
    function resetHash() {
        const windowTop = window.pageYOffset
        window.location.hash = ''
        window.scrollTo(0, windowTop)
    }

    // Открытие модального окна
    function openModal(modal) {
        modal.classList.add('_show')
        bodyLock(true)
    }

    // Закрытие модального окна
    function closeModal(modal) {
        modal.classList.remove('_show')
        bodyLock(false)
        resetHash()
    }
}

// Плейсхолдер текстовых полей
labelTextfield()
function labelTextfield() {
    const textfieldElems = document.querySelectorAll('.textfield')

    for (let i = 0; i < textfieldElems.length; i++) {
        const textfield = textfieldElems[i];
        const input = textfield.querySelector('input, textarea')
        const label = textfield.querySelector('label')

        input.addEventListener('focus', e => {
            label.classList.add('_change-label')
        })

        input.addEventListener('blur', e => {
            if (input.value === '') {
                label.classList.remove('_change-label')
            }
        })
    }
}

// В инпуте могут быть только цифры если у textfield есть класс only-digit
onlyDigit()
function onlyDigit() {
    const inputElems = document.querySelectorAll('[only-digit]')

    for (let i = 0; i < inputElems.length; i++) {
        const input = inputElems[i]

        input.addEventListener('keypress', function(e) {
            const inputValue = e.charCode;
        
            if(!(inputValue >= 48 && inputValue <= 57) && (inputValue != 43 && inputValue != 0 && inputValue != 40 && inputValue != 41 && inputValue != 45 && inputValue != 44)) {
                e.preventDefault();
            }
        }); 
    }
}

// Списки выбора
select()
function select() {
    // Проверяем есть ли выбранные элементы при загрузке страницы. Если есть, то селект заполняется
    const selectedItemElems = document.querySelectorAll('.select-dropdown__item._selected')

    for (let i = 0; i < selectedItemElems.length; i++) {
        const selectedItem = selectedItemElems[i];
        const select = selectedItem.closest('.select')
        const sTitle = select.querySelector('.select-input__title')

        sTitle.innerText = selectedItem.innerHTML
        select.classList.add('_valid')
    }

    // Если пользователь кликнул по селекту, то он открывается/закрывается. Также он закроется если кликнуть вне его области
    window.addEventListener('click', e => {
        const target = e.target

        // Если пользователь кликнул вне зоны селекта
        if (!target.classList.contains('select') && !target.closest('.select._open')) {
            if (find('.select._open')) {
                find('.select._open').classList.remove('_open')
            }

            // для селекта с выбором городов
            if (find('.select-city._open')) {
                find('.select-city._open').classList.remove('_open')
            }
        }

        // Если пользователь кликнул по шапке селекта
        if (target.classList.contains('select-input')) {
            target.parentElement.classList.toggle('_open')
        }

        // Если пользователь выбрал пункт из списка селекта
        if (target.classList.contains('select-dropdown__item')) {
            const select = target.closest('.select')
            const sTitle = select.querySelector('.select-input__title')
            const neighbourTargets = target.parentElement.querySelectorAll('.select-dropdown__item')

            sTitle.innerText = target.innerText

            removeAll(neighbourTargets, '_selected')
            target.classList.add('_selected')

            select.classList.remove('_open')
            select.classList.add('_valid')

            if (select.closest('[data-form-valid=submit-disabled]')) {
                const form = select.closest('[data-form-valid=submit-disabled]')
                const btnSubmit = form.querySelector('[type=submit]')

                if (checkValidTextfields(form)) {
                    btnSubmit.disabled = false
                }
                else {
                    btnSubmit.disabled = true
                }
            }
        }
    })
}

// Аккордеоны
accordions()
function accordions() {
  const hiddenSiblingAcc = true // Скрывать соседние аккордеоны. false если не нужно.
  const accOpenElems = document.querySelectorAll('[data-acc-open]')
  
  for (let i = 0; i < accOpenElems.length; i++) {
    const accOpen = accOpenElems[i]
    
    accOpen.addEventListener('click', e => {
      const container = (!accOpen.closest('.acc-body')) ? accOpen.parentElement.parentElement : accOpen.closest('.acc-body')
      const parent = accOpen.closest('.acc')
      const accBody = accOpen.closest('.acc-header').nextElementSibling

      parent.classList.toggle('_show') 
      accOpen.classList.toggle('_show') 
      
      if (accBody.style.maxHeight) { 
        accBody.style.maxHeight = null
        parent.classList.remove('_show') 
        accOpen.classList.remove('_show') 
      }
      else {
        const adjacentElems = getSiblings(parent)
        
        if (hiddenSiblingAcc) {
          for (let i = 0; i < adjacentElems.length; i++) {
            const elem = adjacentElems[i]
            const elemHeader = elem.querySelector('[data-acc-open]')
            const elemBody = elem.querySelector('.acc-body')

            elem.classList.remove('_show') 
            elemHeader.classList.remove('_show')  
            elemBody.style.maxHeight = null
          }
        }
        
        accBody.style.maxHeight = accBody.scrollHeight + 'px'
        container.style.maxHeight = parseInt(container.scrollHeight) + accBody.scrollHeight + 'px'
      }
    })
  }
}

// Функция для рассчета угла стрелки графика
angleChartArrow(70, 100)
function angleChartArrow(result, max) {
    const arrow = document.getElementById('chart-arrow')

    arrow.style = `display:block; transform:rotate(${result/(max/100)*1.8}deg)`
}

// Функция для рассчета отклонения стрелки эффективности и компетентности сотрудника
indentSwipeArrow('swip_effective_arrow', 62, 100)
indentSwipeArrow('swip_comp_arrow', 62, 100)
function indentSwipeArrow(selector, result, max) {
    const arrow = document.getElementById(selector)

    arrow.style = `display:block; left:${result/(max/100)}%`
}