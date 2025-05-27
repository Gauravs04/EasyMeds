using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using EasyMeds.API.DTOs;

namespace API.Services
{
    public interface ITransactionDetailsService
    {
        Task<IEnumerable<TransactionDetailsDto>> GetAllTransactionDetailsAsync();
        Task<TransactionDetailsDto> GetTransactionDetailsByIdAsync(Guid transactionId);
        Task<TransactionDetailsDto> UpdateTransactionDetailsAsync(TransactionVerifyDto transactionVerifyDto);
        
        Task<bool> DeleteTransactionDetailsAsync(Guid transactionId);
    }
}