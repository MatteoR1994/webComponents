document.addEventListener('user-selected', (e)=>replaceSelected(e.detail))

const users = [
    {name: 'andrea', mail: 'popolo@grr.la'},
    {name: 'francesca', mail: 'paperina@grr.la'},
    {name: 'simone', mail: 'pluto@grr.la'},
    {name: 'marco', mail: 'pippo@grr.la'}
]


for (const user of users) {
    const pippoTag = document.createElement('pippo-tag');
    pippoTag.setAttribute('pippo-user', JSON.stringify(user));
    pippoTag.setAttribute('has-button', 'true');
    document.body.appendChild(pippoTag);
}

function replaceSelected(user){
    const selectedContainer = document.getElementById('selected-user')
    selectedContainer.innerHTML = '';
    const pippoTag = document.createElement('pippo-tag');
    pippoTag.setAttribute('pippo-user', JSON.stringify(user));
    selectedContainer.appendChild(pippoTag);
}