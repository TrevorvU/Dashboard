using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServerController : ControllerBase
    {
        private readonly ApiContext _ctx;
        public ServerController(ApiContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet]
        public async Task<ActionResult> GetServers()
        {
            var response = await _ctx.Servers.OrderBy(s => s.Id)
                .ToListAsync();

            return Ok(response);
        }

        [HttpGet("{id}")]        
        public async Task<ActionResult> GetServer(int id)
        {
            var response = await _ctx.Servers.FindAsync(id);
                
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Message(int id, [FromBody] ServerMessage msg)
        {
            var server = await _ctx.Servers.FindAsync(id);
          

            if(server == null) return NotFound();

            if(msg.PayLoad == "activate") 
            {
                server.IsOnline = true;
                await _ctx.SaveChangesAsync();
            }

            if(msg.PayLoad == "deactivate")
            {
                server.IsOnline = false;
                
            }

            await _ctx.SaveChangesAsync();
            return new NoContentResult();

        }
    }
}