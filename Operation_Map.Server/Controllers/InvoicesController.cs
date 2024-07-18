using Microsoft.AspNetCore.Mvc;
using Operation_Map.Server.Helpers;
using Operation_Map.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Operation_Map.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoiceRepository _invoiceRepository;

        public InvoicesController(IInvoiceRepository invoiceRepository)
        {
            _invoiceRepository = invoiceRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Invoice>>> GetInvoices([FromQuery] string userEmail, [FromQuery] string projectId, [FromQuery] string lineItemId)
        {
            var invoices = await _invoiceRepository.GetInvoicesAsync(userEmail, projectId, lineItemId);
            return Ok(invoices);
        }

        [HttpGet("{invoiceId}")]
        public async Task<ActionResult<Invoice>> GetInvoice([FromQuery] string userEmail, [FromQuery] string projectId, [FromQuery] string lineItemId, string invoiceId)
        {
            var invoice = await _invoiceRepository.GetInvoiceByIdAsync(userEmail, projectId, lineItemId, invoiceId);
            if (invoice == null)
            {
                return NotFound("Invoice not found");
            }
            return Ok(invoice);
        }

        [HttpPost]
        public async Task<ActionResult<Invoice>> CreateInvoice([FromQuery] string userEmail, [FromQuery] string projectId, [FromQuery] string lineItemId, [FromBody] Invoice invoice)
        {
            await _invoiceRepository.CreateInvoiceAsync(userEmail, projectId, lineItemId, invoice);
            return CreatedAtAction(nameof(GetInvoice), new { userEmail, projectId, lineItemId, invoiceId = invoice.Id }, invoice);
        }

        [HttpPut("{invoiceId}")]
        public async Task<IActionResult> UpdateInvoice([FromQuery] string userEmail, [FromQuery] string projectId, [FromQuery] string lineItemId, string invoiceId, [FromBody] Invoice invoice)
        {
            await _invoiceRepository.UpdateInvoiceAsync(userEmail, projectId, lineItemId, invoiceId, invoice);
            return NoContent();
        }

        [HttpDelete("{invoiceId}")]
        public async Task<IActionResult> DeleteInvoice([FromQuery] string userEmail, [FromQuery] string projectId, [FromQuery] string lineItemId, string invoiceId)
        {
            await _invoiceRepository.DeleteInvoiceAsync(userEmail, projectId, lineItemId, invoiceId);
            return NoContent();
        }
    }
}
