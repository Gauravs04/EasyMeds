using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyMeds.API.DTOs
{
    public class DrugDto
    {
        public string Name{get;set;}
        public string Description{get;set;}
        public long Stock{get;set;}
        public decimal Price{get;set;}

        public Guid CategoryId{get;set;}

    }
}