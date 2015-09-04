using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using HouseholdBudgeter.Models;
using System.Configuration;
using SendGrid;
using System.Net.Mail;
using System.Net;

namespace HouseholdBudgeter
{
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your email service here to send an email.
            var username = ConfigurationManager.AppSettings["SendGridUserName"];
            var password = ConfigurationManager.AppSettings["SendGridPassword"];
            var from = ConfigurationManager.AppSettings["HouseholdBudgeterNoReplyEmail"];
            SendGridMessage myMessage = new SendGridMessage();
            myMessage.AddTo(message.Destination);
            myMessage.From = new MailAddress(from);
            myMessage.Subject = message.Subject;
            myMessage.Html = message.Body;

            var credentials = new NetworkCredential(username, password);

            var transportWeb = new Web(credentials);

            return transportWeb.DeliverAsync(myMessage);
        }
    }

    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
