const express = require("express")
const MercadoPago = require('mercadopago');
const app = express();

MercadoPago.configure({
  sandbox: true,
  access_token: "TEST-2362063213678220-080416-616113121df567cf59db7848fb787252-362610279"
});

app.get("/", (req, res) => {
  res.send("Olá mundo!");
});

app.get("/pagamento", async (req, res) => {

  var id = "" + Date.now();
  var email = "viniciusjose_melo1998@hotmail.com";

  const data = {
    items: [
      item = {
        id: id,
        title: "2x video games",
        quantity: 1,
        currency_id: 'BRL',
        unit_price: parseFloat(1)
      }
    ],
    payer: {
      email: email
    },
    external_reference: id,
  }

  try {
    var pagamento = await MercadoPago.preferences.create(data);
    console.log(pagamento);
    return res.redirect(pagamento.body.init_point);
  } catch (err) {
    return res.send(err.message);
  }
});

app.post('/not', (req, res) => {
  var id = req.query.id;
  setTimeout(() => {
    var filtro = {
      "order.id": id
    }
    MercadoPago.payment.search({
      qs: filtro
    }).then(data => {
      var pagamento = data.body.results[0];
      if (pagamento != undefined) {
        console.log(pagamento);
        console.log(pagamento.external_reference);
        console.log(pagamento.status);
      } else {
        console.log("Pagamento não existe");
      }
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
  }, 20000)
  res.send("ok");
})

app.listen(3000, (req, res) => {
  console.log('Server is running')
});