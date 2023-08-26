const fs = require('fs');
const xml2js = require('xml2js'); 
const os = require('os');

// Read the XML file
const filecontent = fs.readFileSync('./input.txt');
const xmlData = filecontent.toString();

const parser = new xml2js.Parser();
parser.parseString(xmlData, (err, result) => {
  if (err) {
    console.error('Error parsing XML:', err);
  } else {
    
    let voucherarray = [];
    for (let i=0; i<result.export.vouchers.length; i++) {
        for(let x=0; x<result.export.vouchers[i].voucher.length; x++) {
                for(let u=0; u<result.export.vouchers[i].voucher[x].paxs.length; u++){
                   for(let z=0; z<result.export.vouchers[i].voucher[x].paxs[u].pax.length; z++){
                       
                       let voucher_no = result.export.vouchers[i].voucher[x].common[0].voucher_no;
                       let booking_date = result.export.vouchers[i].voucher[x].common[0].booking_date;
                       let pax_name = result.export.vouchers[i].voucher[x].paxs[u].pax[z].name;
                       let date_of_birth = result.export.vouchers[i].voucher[x].paxs[u].pax[z].date_of_birth;
                       let check_in = result.export.vouchers[i].voucher[x].paxs[u].pax[z].check_in_date;
                       let check_out = result.export.vouchers[i].voucher[x].paxs[u].pax[z].check_out_date;
                       let room_type = result.export.vouchers[i].voucher[x].paxs[u].pax[z].room_type;
                       let all_inclusive = result.export.vouchers[i].voucher[x].paxs[u].pax[z].board;
                        
                       voucherarray.push({voucher_no, booking_date, pax_name, date_of_birth, check_in, check_out, room_type, all_inclusive});

                   }
                }

        }
    }


    // Convert the array to a formatted string
    const header = "Voucher No,Booking Date,Name,DOB,Check In,Check Out,Type,View,Board";
    const csvRows = voucherarray.map(item => `${item.voucher_no},${item.booking_date},${item.pax_name},${item.date_of_birth},${item.check_in},${item.check_out},${item.room_type},${item.all_inclusive}`).join(os.EOL);
    
    const csvContent = `${header}${os.EOL}${csvRows}`;
    // Save the string to a file
    fs.writeFileSync('output.csv',csvContent, 'utf-8');
    

    console.log('Conversion successful. Saved as output.csv');
  }
});







