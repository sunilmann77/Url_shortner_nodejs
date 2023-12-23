
module.exports.home = async function(req, res) {
    try { 
      return res.render('home', {
            title: "I am flying",
        });
    } catch (err) {
        console.log('error', err);
        return res.redirect('/');
    }
}
