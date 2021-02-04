using System;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private ApiContext _ctx { get; set; }
        public OrderController(ApiContext ctx)
        {
            _ctx = ctx;

        }

        [HttpGet("{pageIndex:int}/{pageSize:int}")]
        public async Task<ActionResult> GetOrders (int pageIndex, int pageSize)
        {
            var data = await _ctx.Orders.Include(o => o.Customer)
                .OrderByDescending(c => c.Placed)
                .ToListAsync();

            var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);

            var totalCount = data.Count();
            var totalPages = Math.Ceiling((double)totalCount / pageSize);

            var response = new 
            {
                Page = page,
                totalPages = totalPages
            };

            return Ok(response);
        }

        [HttpGet("byState")]
        public async Task<ActionResult> ByState()
        {
            var orders = await _ctx.Orders.Include(o => o.Customer).ToListAsync();

            var groupedResult = orders.GroupBy(o => o.Customer.State)
                .ToList()
                .Select(grp => new {
                    State = grp.Key,
                    Total = grp.Sum(x => x.Total)
                }).OrderByDescending(res => res.Total)
                .ToList();

            return Ok(groupedResult);
        }

        [HttpGet("byCustomer/{n}")]
        public async Task<ActionResult> ByCustomer(int n)
        {
            var orders =  await _ctx.Orders.Include(o => o.Customer).ToListAsync();

            var groupedResult = orders.GroupBy(o => o.Customer.State)
                .ToList()
                .Select(grp => new {
                    Name = grp.Key,
                    Total = grp.Sum(x => x.Total)
                }).OrderByDescending(res => res.Total)
                .Take(n)
                .ToList();

            return Ok(groupedResult);
        }

        [HttpGet("getOrder/{id}", Name="getOrder")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _ctx.Orders.Include(o => o.Customer)
                .FirstAsync(o => o.Id == id);

                return Ok(order);
        }
    }
}