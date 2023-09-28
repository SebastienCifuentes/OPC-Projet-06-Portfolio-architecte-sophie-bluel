const token = localStorage.getItem('token');

if (token){
    document.querySelector('.blackBarAdmin').classList.remove('hidden');
    document.querySelector('.filters').classList.add('hidden');
}
else{
    
}