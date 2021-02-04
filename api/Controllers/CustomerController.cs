using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ApiContext _ctx;

        public CustomerController(ApiContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCustomers()
        {
            var data =   await _ctx.Customers.OrderBy(c => c.Id).ToListAsync();

            return Ok(data);
        }



        [HttpGet("getCustomer/{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await _ctx.Customers.FindAsync(id);
            return Ok(customer);
        }

        [HttpPost]
        public async Task<ActionResult> AddCustomer(Customer customer)
        {
            if(customer == null)
            {
                return BadRequest();
            }

            await _ctx.Customers.AddAsync(customer);
            await _ctx.SaveChangesAsync();

            return Ok(customer);
        }


    }
}