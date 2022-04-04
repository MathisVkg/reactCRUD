using Microsoft.AspNetCore.Mvc;
using WebAPIReactCrud.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using WebAPIReactCrud.Common.Mappings;

namespace WebAPIReactCrud.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProviderDatabaseController : ControllerBase
    {
        private readonly MyDbContext _context;
        
        public ProviderDatabaseController(MyDbContext context)
        {
            _context = context;
        }
        
        [HttpGet(Name = "GetProvider")]
        public IActionResult GetProvider()
        {
            List<Provider> providers = _context.Providers.ToList();
            return Ok(providers);
        }
        
        [HttpPost(Name = "PostProviders")]
        public async Task<ActionResult<ProviderDto>> PostProduction(ProviderDto providto)
        {
            var provider = new Provider
            {
                Name = providto.Name
            };
            _context.Providers.Add(provider);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProvider", provider);
        }
        
        [HttpDelete(Name = "DeleteProvider")]
        public async Task<IActionResult> DeleteProvider(int id)
        {
            var provider = await _context.Providers.FindAsync(id);
            if (provider == null)
            {
                return NotFound();
            }

            _context.Providers.Remove(provider);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
    }
    
    public class ProviderDto: IMapFrom<Provider>
    {
        public string Name { get; set; }
    }
}