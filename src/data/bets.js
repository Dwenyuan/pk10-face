// module.exports = 
var a = [{ "userid": 30, "betnum": 5, "betmoney": 2000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 5, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 6, "betmoney": 7000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 6, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 6, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 6, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 6, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 6, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 6, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 11000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": 0, "betmoney": 1000, "idnum": 577791, "type": "NUMBER", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": "small", "betmoney": 6000, "idnum": 577791, "type": "BIG_OR_SMALL", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": "small", "betmoney": 1000, "idnum": 577791, "type": "BIG_OR_SMALL", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": "small", "betmoney": 1000, "idnum": 577791, "type": "BIG_OR_SMALL", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": "small", "betmoney": 1000, "idnum": 577791, "type": "BIG_OR_SMALL", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": "small", "betmoney": 1000, "idnum": 577791, "type": "BIG_OR_SMALL", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }, 
{ "userid": 30, "betnum": "small", "betmoney": 1000, "idnum": 577791, "type": "BIG_OR_SMALL", "betimg": "build/a2e5787cdddce03baf9e9bd421c63fe0.png" }]
var checkEqule = (key1, key2) => {
    if (key1.userid === key2.userid && key1.betnum === key2.betnum && key1.idnum === key2.idnum && key1.type === key2.type) {
        return true
    } else {
        return false
    }
}
var result = []
a.forEach(value => {
    if (result.length === 0) {
        result.push(value)
    } else {
        var temp = null
        result.forEach(val => {
            if (checkEqule(val, value)) {
                temp = val
            }
        })
        if (temp) {
            temp.betmoney += value.betmoney
            temp = null
        } else {
            result.push(value)
        }
    }
})
result.map(value => console.log(value.betnum + ':' + value.betmoney))
