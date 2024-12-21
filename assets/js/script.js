let usersContainer = document.querySelector(".users");
let searchButton = document.getElementById("btn_search");

function createUser(user){
    return `
            <div class="user">
                    <div class="box-info">
                        <h1>الاسم الكامل:</h1>
                        <h1>${user.name}</h1>
                    </div>
                    <div class="box-info">
                        <h1>اسم المستخدم:</h1>
                        <h1>${user.username}</h1>
                    </div>
                    <div class="box-info">
                        <h1>البريد الإكتروني:</h1>
                        <h1>${user.email}</h1>
                    </div>
                    <div class="box-info">
                        <h1>رقم الهاتف:</h1>
                        <h1>${user.phone}</h1>
                    </div>
                    <div class="box-info">
                        <h1 style="margin-top: 20px;">العنوان</h1>
                        <h1></h1>
                    </div>
                    <div class="box-info">
                        <h1>المدينة:</h1>
                        <h1>${user.address.city}</h1>
                    </div>
                    <div class="box-info">
                        <h1>الشارع:</h1>
                        <h1>${user.address.street}</h1>
                    </div>
            </div>
        `;
}

function getAllUsers(){
    usersContainer.innerHTML = `<p>جاري تحميل البيانات...</p>`;

    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
        let users = response.data;
        let content = "";
        users.forEach(user => {
            content += createUser(user);
        })
        usersContainer.innerHTML = content;
    })
    .catch(function (error) {
        console.log(error);
        usersContainer.innerHTML = `<p style="color: red">حدثت مشكلة اثناء تحميل البيانات</p>`
    })
}

searchButton.addEventListener("click", function(e){
    e.preventDefault()
    let username = document.getElementById("username_input").value;
    
    if(username.length == 0 && usersContainer.children.length == 1){
        console.log("a");
        console.log(username.length);
        getAllUsers();
    }
    else if(username.length != 0) {
        usersContainer.innerHTML = `<p>جاري البحث...</p>`;
        axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}`)
        .then(function (response) {
            let user = response.data;
            let userCard = createUser(user[0]);
            usersContainer.innerHTML = userCard;
        })
        .catch(function (error) {
            console.log(error);
            usersContainer.innerHTML = `<p style="color: red">لا يوجد مستخدم بهذا الاسم </p>`;
        })
    }
})

getAllUsers()