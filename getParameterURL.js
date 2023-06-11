const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id").toUpperCase();
const pass = urlParams.get("pass").toUpperCase();

console.log(id);
console.log(pass);




const tokenGroup_allGroup = 'gYwgq9RUWMafEfKHgxO9NoqIyOVKclbwNRENX7ikt3U'; // กลุ่ม SHIBA : แจ้งการจองทุกสาขา
const allGroupCh = true;

let tokenGroup = ''; 
let branch = '';

let site_uuid = '';


//https://hana--sudtayonnuam.repl.co/?id=vu&pass=1345#
async function getToken() {

    switch (id) {
        case 'SUT':
            token = await api_request_token("Kiosk_shiba", "app-SUT", "7I1fsMNyD7SC8pFxkJkv"); //SUT
            site_uuid = "798af4ba-8758-4a89-a0e9-8ba178b687cb"; //SUT
            branch = 'SUT';
            tokenGroup = 'ir5X1KpP7v5VWSzunq7HXagQvOtzOZx1loq673rstS9'; // กลุ่ม Shiba (SUT) Working
            break;
        case 'VU':
            token = await api_request_token("Kiosk_shiba", "app-VU", "PYMIJUmcWjb1HQOyJmVj"); //VU
            site_uuid = '17b74846-fa56-48e0-94cb-0da2eea7302c'; //VU
            branch = 'VU';
            tokenGroup = '8Uf2p4QBpRFunK6Igg01GWs12ccOitzqyqQtnwBM1NS'; // กลุ่ม Shiba (VU)
            break;
        default:
            token = await api_request_token("Kiosk_shiba", "app-DEMO", "53OkPEkzILya1O23XZsd"); //Demo
            site_uuid = 'a0d07ab1-0af1-4ea0-b7f4-42a0e58a556e'; //Demo
            branch = 'DEMO';
            tokenGroup = 'B1lOLAjFGidIvy2sz6UUHUVQewc6KNjWFBnaKMifu2D'; 
    }

    console.log('Get token');
    

}

