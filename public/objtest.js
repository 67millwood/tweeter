
var obj = {
  "key1": "id_789",
  "tweets": [
    {"name": "keith", "lastname": "mcspurren", "height": "tall"},
    {"name": "joe", "lastname": "wilson", "height": "med"},
    {"name": "steve", "lastname": "thompson", "height": "short"},
    ]
}


for (num in obj.tweets) {
  console.log(obj.tweets[num].lastname)
}

console.log(obj[2].lastname);