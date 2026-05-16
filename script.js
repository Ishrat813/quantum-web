window.addEventListener('DOMContentLoaded',()=>{

const loader=document.querySelector('.loader')

setTimeout(()=>{
  if(loader){
    loader.style.opacity='0'
    loader.style.visibility='hidden'
  }
},1200)

const reveal=document.querySelectorAll('.reveal')

const revealItems=()=>{
  reveal.forEach(item=>{
    const top=item.getBoundingClientRect().top

    if(top < window.innerHeight - 100){
      item.classList.add('active')
    }
  })
}

window.addEventListener('scroll',revealItems)
revealItems()

const faq=document.querySelectorAll('.faq-item')

faq.forEach(item=>{

  const btn=item.querySelector('.faq-question')
  const answer=item.querySelector('.faq-answer')

  btn.addEventListener('click',()=>{

    item.classList.toggle('active')

    if(item.classList.contains('active')){
      answer.style.maxHeight=answer.scrollHeight + 'px'
    }else{
      answer.style.maxHeight='0px'
    }

  })

})

const counters=document.querySelectorAll('.counter')

counters.forEach(counter=>{

  const target=Number(counter.dataset.target)
  let current=0

  const updateCounter=()=>{

    current += Math.ceil(target/80)

    if(current > target){
      current = target
    }

    counter.innerText=current

    if(current < target){
      requestAnimationFrame(updateCounter)
    }

  }

  updateCounter()

})

const toggle=document.getElementById('themeToggle')

if(toggle){
  toggle.addEventListener('click',()=>{
    document.body.classList.toggle('light')
  })
}

const mobileToggle=document.querySelector('.mobile-toggle')
const mobileMenu=document.querySelector('.mobile-menu')

if(mobileToggle){
  mobileToggle.addEventListener('click',()=>{
    mobileMenu.classList.toggle('active')
  })
}

const popup=document.getElementById('popup')

window.closePopup=function(){
  popup.style.display='none'
}

const form=document.getElementById('contactForm')

if(form){

form.addEventListener('submit',(e)=>{

  e.preventDefault()

  popup.style.display='flex'

  form.reset()

  setTimeout(()=>{
    popup.style.display='none'
  },2500)

})

}

const cursor=document.querySelector('.cursor')
const dot=document.querySelector('.cursor-dot')

window.addEventListener('mousemove',(e)=>{

  if(cursor && dot){

    cursor.style.top=e.clientY+'px'
    cursor.style.left=e.clientX+'px'

    dot.style.top=e.clientY+'px'
    dot.style.left=e.clientX+'px'

  }

})

const serviceButtons=document.querySelectorAll('.open-service')

serviceButtons.forEach(btn=>{

  btn.addEventListener('click',(e)=>{

    e.preventDefault()

    alert(btn.dataset.service + ' page can be connected later.')

  })

})

})
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.querySelector('.loader').style.display='none'
  },1500)
})

const reveal=document.querySelectorAll('.reveal')

window.addEventListener('scroll',()=>{
  reveal.forEach(item=>{
    const top=item.getBoundingClientRect().top

    if(top<window.innerHeight-100){
      item.classList.add('active')
    }
  })
})

const faq=document.querySelectorAll('.faq-item')

faq.forEach(item=>{
  const btn=item.querySelector('.faq-question')

  btn.addEventListener('click',()=>{
    item.classList.toggle('active')

    const answer=item.querySelector('.faq-answer')

    if(item.classList.contains('active')){
      answer.style.maxHeight=answer.scrollHeight+'px'
    }else{
      answer.style.maxHeight=null
    }
  })
})

const counters=document.querySelectorAll('.counter')

counters.forEach(counter=>{

  const update=()=>{
    const target=+counter.dataset.target
    const count=+counter.innerText

    const inc=target/80

    if(count<target){
      counter.innerText=Math.ceil(count+inc)
      setTimeout(update,30)
    }else{
      counter.innerText=target
    }
  }

  update()
})

const toggle=document.getElementById('themeToggle')

toggle.addEventListener('click',()=>{
  document.body.classList.toggle('light')
})

const mobileToggle=document.querySelector('.mobile-toggle')
const mobileMenu=document.querySelector('.mobile-menu')

mobileToggle.addEventListener('click',()=>{
  mobileMenu.classList.toggle('active')
})

const popup=document.getElementById('popup')

function closePopup(){
  popup.style.display='none'
}

const SUPABASE_URL='YOUR_SUPABASE_URL'
const SUPABASE_KEY='YOUR_SUPABASE_ANON_KEY'

let supabaseClient=null

try{
  if(window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL'){
    supabaseClient=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)
  }
}catch(err){
  console.log('Supabase not connected yet')
}

const form=document.getElementById('contactForm')

form.addEventListener('submit',async(e)=>{
  e.preventDefault()

  const inputs=form.querySelectorAll('input, textarea, select')

  const data={
    name:inputs[0].value,
    email:inputs[1].value,
    phone:inputs[2].value,
    service:inputs[3].value,
    budget:inputs[4].value,
    timeline:inputs[5].value,
    details:inputs[6].value
  }

  try{

    if(supabaseClient){
      await supabaseClient
      .from('contacts')
      .insert([data])
    }

    popup.style.display='flex'

    setTimeout(()=>{
      window.location.href='#home'
    },2500)

    form.reset()

  }catch(err){
    alert('Error submitting form')
  }
})

const cursor=document.querySelector('.cursor')
const dot=document.querySelector('.cursor-dot')

window.addEventListener('mousemove',(e)=>{
  cursor.style.top=e.clientY+'px'
  cursor.style.left=e.clientX+'px'

  dot.style.top=e.clientY+'px'
  dot.style.left=e.clientX+'px'
})

const serviceButtons=document.querySelectorAll('.open-service')

serviceButtons.forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    e.preventDefault()

    alert(btn.dataset.service+' detailed page can be added as separate HTML page.')
  })
})
