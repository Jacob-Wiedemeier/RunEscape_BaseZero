const db_fetch = async (function_name, id) => {
    const result = await fetch(`/db/${function_name}/${id}`, {
        headers:{
            'content-type': 'application/json',
            'accepts': 'application/json'
        }
    })

    return await result.json()
}

const db_fetch_2 = async (function_name, id1, id2) => {
    const result = await fetch(`/db/${function_name}/${id1}/${id2}`, {
        headers:{
            'content-type': 'application/json',
            'accepts': 'application/json'
        }
    })

    return await result.json()
}

const db_post = async (function_name, obj, id) => {
    await fetch(`/db/${function_name}/${id}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accepts': 'application/json'
        },
        body: JSON.stringify(obj)
    })
}
