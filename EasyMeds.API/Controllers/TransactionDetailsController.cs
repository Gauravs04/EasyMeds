using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionDetailsController : ControllerBase
    {
        private readonly ITransactionDetailsService _transactionService;

        public TransactionDetailsController(ITransactionDetailsService transactionService)
        {
            _transactionService = transactionService;
        }

        // GET: api/TransactionDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDetailsDto>>> GetAllTransactionDetails()
        {
            var transactions = await _transactionService.GetAllTransactionDetailsAsync();
            return Ok(transactions);
        }

        // GET: api/TransactionDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDetailsDto>> GetTransactionDetails(Guid id)
        {
            var transaction = await _transactionService.GetTransactionDetailsByIdAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        // POST: api/TransactionDetails
        [HttpPost]
        public async Task<ActionResult<TransactionDetailsDto>> CreateTransactionDetails(CreateTransactionDetailsDto createTransactionDetailsDto)
        {
            var transaction = await _transactionService.CreateTransactionDetailsAsync(createTransactionDetailsDto);
            return CreatedAtAction(nameof(GetTransactionDetails), new { id = transaction.TransactionId }, transaction);
        }

        // PUT: api/TransactionDetails/5
        // [HttpPut("{id}")]
        // public async Task<IActionResult> UpdateTransactionDetails(Guid id, UpdateTransactionDetailsDto updateTransactionDetailsDto)
        // {
        //     var transaction = await _transactionService.UpdateTransactionDetailsAsync(id, updateTransactionDetailsDto);
        //     if (transaction == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(transaction);
        // }

        // DELETE: api/TransactionDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransactionDetails(Guid id)
        {
            var result = await _transactionService.DeleteTransactionDetailsAsync(id);
            if (result==false)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}