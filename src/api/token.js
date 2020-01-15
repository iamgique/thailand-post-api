const axios = require('axios')

const getToken = async (req) => {
    const resp = await getPageInfo(req.access_token)
    for(let page of resp.data.data){
        await pool.query("INSERT INTO dt_pages(facebook_id, page_id, page_name, page_access_token) VALUES ('"+ req.facebook_id +"', '"+ page.id +"', '"+ page.name +"', '"+ page.access_token +"') ON DUPLICATE KEY UPDATE page_access_token = '"+ page.access_token +"'");
        await pool.query("INSERT INTO dt_message(page_id) VALUES ('"+ page.id +"') ON DUPLICATE KEY UPDATE updated_at = NOW();");
        const subscribeReq = { "access_token": page.access_token, "page_id": page.id }
        const subscribeRes = await external.subscribeApps(subscribeReq)
        console.log("Subscribe status: " + JSON.stringify(subscribeRes.data))
    }
}

const getToken = async (req) => {
    console.log('Subscribe apps page id: ' + req.page_id)
    try {
        const prepare = {
            method: 'POST',
            url: 'https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token',
            data: {
                "access_token": req.access_token
            }
        }
        return await axios(prepare)
  } catch (error) {
    return error.response
  }
}


module.exports = {
    getToken: getToken
}