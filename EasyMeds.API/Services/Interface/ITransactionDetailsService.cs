using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Services
{
    public interface ITransactionDetailsService
    {
        Task<IEnumerable<TransactionDetailsDto>> GetAllTransactionDetailsAsync();
        Task<TransactionDetailsDto> GetTransactionDetailsByIdAsync(Guid transactionId);
        Task<TransactionDetailsDto> CreateTransactionDetailsAsync(CreateTransactionDetailsDto createTransactionDetailsDto);
        // Task<TransactionDetailsDto> UpdateTransactionDetailsAsync(Guid transactionId, UpdateTransactionDetailsDto updateTransactionDetailsDto);
        Task<bool> DeleteTransactionDetailsAsync(Guid transactionId);
    }
}